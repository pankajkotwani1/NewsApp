import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import data from '../../mocks/newsData.json';
import {NewsArticle, fetchTopHeadlines} from '../../services/Api';
import {storeHeadlines} from '../../services/store';
import HeadlineItem from '../HeadlineItem/HeadlineItem';
import styles from './style';

const NewsList: React.FC = () => {
  const [headlines, setHeadlines] = useState<NewsArticle[]>([]);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    const fetchAndStoreHeadlines = async () => {
      let fetchedHeadlines = await fetchTopHeadlines();

      fetchedHeadlines = fetchedHeadlines?.articles ?? data?.articles;

      setHeadlines(fetchedHeadlines);
      storeHeadlines(fetchedHeadlines);
    };

    fetchAndStoreHeadlines();

    const interval = setInterval(() => {
      updateHeadlines();
    }, 10000);

    setRefreshInterval(interval);

    return () => clearInterval(interval);
  }, []);

  const updateHeadlines = async () => {
    try {
      const storedHeadlines = await AsyncStorage.getItem('headlines');
      const headlines = storedHeadlines ? JSON.parse(storedHeadlines) : [];

      if (headlines.length <= 10) {
        let fetchedHeadlines = await fetchTopHeadlines();

        fetchedHeadlines = fetchedHeadlines?.articles ?? data?.articles;
        setHeadlines(fetchedHeadlines.slice(0, 10));
        storeHeadlines(fetchedHeadlines);
      } else {
        const newHeadlines = headlines.slice(5, 15);
        setHeadlines(prevHeadlines => [
          ...newHeadlines,
          ...prevHeadlines.slice(0, 5),
        ]);
      }
    } catch (error) {
      console.error('Error updating headlines:', error);
      let fetchedHeadlines = await fetchTopHeadlines();

      fetchedHeadlines = fetchedHeadlines?.articles ?? data?.articles;
      setHeadlines(fetchedHeadlines.slice(0, 10));
      storeHeadlines(fetchedHeadlines);
    }
  };

  const handleManualRefresh = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
    updateHeadlines();
    const interval = setInterval(() => {
      updateHeadlines();
    }, 10000);
    setRefreshInterval(interval);
  };

  const renderItem = ({item}: {item: NewsArticle}) => (
    <HeadlineItem
      item={item}
      onDelete={handleDeleteHeadline}
      onPin={handlePinHeadline}
    />
  );

  const handleDeleteHeadline = (item: NewsArticle) => {
    setHeadlines(prevHeadlines =>
      prevHeadlines.filter(headline => headline.url !== item.url),
    );
  };

  const handlePinHeadline = (item: NewsArticle) => {
    setHeadlines(prevHeadlines => {
      const pinnedHeadlines = prevHeadlines.filter(
        headline => headline.url === item.url,
      );
      const unpinnedHeadlines = prevHeadlines.filter(
        headline => headline.url !== item.url,
      );
      return [...pinnedHeadlines, ...unpinnedHeadlines];
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerListTitle}>News List</Text>
        <Pressable onPress={handleManualRefresh} style={styles.refreshBtn}>
          <Text style={styles.refreshText}>Refresh</Text>
        </Pressable>
      </View>
      <View style={styles.stickyHeader}>
        <Text style={styles.note}>
          Note: Swipe left to pin or swipe right to delete article
        </Text>
      </View>
      <FlatList
        data={headlines}
        renderItem={renderItem}
        keyExtractor={item => item.url}
      />
    </View>
  );
};

export default NewsList;
