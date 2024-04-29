import AsyncStorage from '@react-native-async-storage/async-storage';
import {NewsArticle} from './Api';

export const storeHeadlines = async (headlines: NewsArticle[]) => {
  try {
    await AsyncStorage.setItem('headlines', JSON.stringify(headlines));
  } catch (error) {
    console.error('Error storing headlines:', error);
  }
};

export const getStoredHeadlines = async (): Promise<NewsArticle[]> => {
  try {
    const storedHeadlines = await AsyncStorage.getItem('headlines');
    return storedHeadlines ? JSON.parse(storedHeadlines) : [];
  } catch (error) {
    console.error('Error retrieving stored headlines:', error);
    return [];
  }
};
