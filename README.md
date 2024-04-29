Sure, here's a README file for the NewsApp project:

# NewsApp

NewsApp is a React Native application that fetches the top 100 news headlines, stores them for offline access, displays them in a dynamic list view, and allows user interaction.

![Alt Text](https://github.com/pankajkotwani1/NewsApp/blob/main/App.gif)

## Features

- Fetch the top 100 news headlines from a news API
- Store headlines in local storage for offline access
- Display the first 10 headlines in a list view on app load
- Introduce a new batch of up to 5 random headlines to the top of the list every 10 seconds
- Allow users to manually trigger fetching the next batch from local storage and resetting the drip timer
- Handle exhaustion of headlines by resetting local storage and fetching the next batch
- Allow users to swipe a headline to delete it or pin it to the top of the view
- Pinned headlines stay in view when the list updates, whether manually or automatically

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/NewsApp.git
```

2. Navigate to the project directory:

```bash
cd NewsApp
```

3. Install dependencies:

```bash
npm install
```

## Configuration

Before running the app, you need to configure the news API key. Open the `src/services/Api.ts` file and replace `'YOUR_API_KEY'` with your actual API key from [NewsAPI.org](https://newsapi.org/).

## Running the App

1. Start the Metro bundler:

```bash
npx react-native start
```

2. Run the app on an Android emulator or physical device:

```bash
npx react-native run-android
```

Or, run the app on an iOS simulator or physical device:

```bash
npx react-native run-ios
```

Note: For iOS, you'll need to have Xcode installed and set up correctly.

## Dependencies

The project relies on the following dependencies:

- `@react-native-async-storage/async-storage` for storing headlines locally
- `axios` for making HTTP requests to the news API
- `react-native-gesture-handler` for implementing swipe gestures

## Code Structure

- `src/components/NewsList.tsx`: The main component that handles fetching, storing, and displaying headlines
- `src/components/HeadlineItem.tsx`: A component that renders a single headline item with swipe-to-delete and swipe-to-pin functionality
- `src/services/Api.ts`: Functions for fetching headlines from the news API
- `src/services/store.ts`: Functions for storing and retrieving headlines from local storage
