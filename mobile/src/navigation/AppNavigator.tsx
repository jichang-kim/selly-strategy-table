import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import EventsListScreen from '../screens/EventsListScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import CampaignDetailScreen from '../screens/CampaignDetailScreen';
import CompanyListScreen from '../screens/CompanyListScreen';
import CompanyDetailScreen from '../screens/CompanyDetailScreen';
import ReportsScreen from '../screens/ReportsListScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';
import ResearchScreen from '../screens/ResearchListScreen';
import ResearchDetailScreen from '../screens/ResearchDetailScreen';
import JournalListScreen from '../screens/JournalListScreen';
import JournalDetailScreen from '../screens/JournalDetailScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Event" component={EventsListScreen} options={{ title: 'Event' }} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Event Detail' }} />
      <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} options={{ title: 'Campaign' }} />
      <Stack.Screen name="Company" component={CompanyListScreen} options={{ title: 'Company' }} />
      <Stack.Screen name="CompanyDetail" component={CompanyDetailScreen} options={{ title: 'Company Detail' }} />
      <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reports' }} />
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} options={{ title: 'Report Detail' }} />
      <Stack.Screen name="Research" component={ResearchScreen} options={{ title: 'Research' }} />
      <Stack.Screen name="ResearchDetail" component={ResearchDetailScreen} options={{ title: 'Research Detail' }} />
      <Stack.Screen name="Journal" component={JournalListScreen} options={{ title: 'Journal' }} />
      <Stack.Screen name="JournalDetail" component={JournalDetailScreen} options={{ title: 'Journal Detail' }} />
    </Stack.Navigator>
  );
}
