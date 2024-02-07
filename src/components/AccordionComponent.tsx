import React, {useState, useEffect, useRef} from 'react';
import {Pressable, StyleSheet, View, Animated} from 'react-native';

const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 4,
  },
  triangle: {
    width: 0,
    height: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'purple',
  },
});

type AccordionProps = {
  /**
   * Title View of the accordion.
   */
  titleView: JSX.Element;
  /**
   * Content of the accordion.
   */
  children: React.ReactNode;
};

export default function Accordion({children, titleView}: AccordionProps) {
  const [isOpened, setIsOpened] = useState(false);

  const rotateAnimation = useRef(new Animated.Value(0));
  const maxHeightAnimation = useRef(new Animated.Value(0));
  const opacityAnimation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(rotateAnimation.current, {
      toValue: isOpened ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnimation.current, {
      toValue: isOpened ? 1 : 0,
      duration: 300,
      delay: isOpened ? 200 : 0,
      useNativeDriver: false,
    }).start();

    Animated.timing(maxHeightAnimation.current, {
      toValue: isOpened ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isOpened, rotateAnimation, opacityAnimation, maxHeightAnimation]);

  const rotate = rotateAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animatedMaxHeight = maxHeightAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const animatedOpacity = opacityAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.accordionContainer}>
      <Pressable hitSlop={8} onPress={() => setIsOpened(!isOpened)}>
        <Animated.View
          style={[
            styles.triangle,
            {
              transform: [{rotate: rotate}],
            },
          ]}
        />
      </Pressable>
      <Animated.View
        style={{maxHeight: animatedMaxHeight, opacity: animatedOpacity}}>
        {children}
      </Animated.View>
      {titleView}
    </View>
  );
}
