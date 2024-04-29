import React, {useState} from 'react';
import {Animated, Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {NewsArticle} from '../../services/Api';
import styles from './style';

interface HeadlineItemProps {
  item: NewsArticle;
  onDelete: (item: NewsArticle) => void;
  onPin: (item: NewsArticle) => void;
}

const HeadlineItem: React.FC<HeadlineItemProps> = ({item, onDelete, onPin}) => {
  const [isPinned, setIsPinned] = useState(false);
  const translateX = useState(new Animated.Value(0))[0];

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(event => {
      translateX.setValue(event.translationX);
    })
    .onEnd(event => {
      const shouldDelete = event.translationX < -100;
      const shouldPin = event.translationX > 100;

      if (shouldDelete) {
        Animated.timing(translateX, {
          toValue: -1000,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onDelete(item);
          translateX.setValue(0);
        });
      } else if (shouldPin) {
        Animated.timing(translateX, {
          toValue: 1000,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onPin(item);
          setIsPinned(true);
          translateX.setValue(0);
        });
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, {transform: [{translateX}]}]}>
        <Text style={styles.headline}>{item.title}</Text>
        {isPinned && <Text style={styles.pinned}>Pinned</Text>}
      </Animated.View>
    </GestureDetector>
  );
};

export default HeadlineItem;
