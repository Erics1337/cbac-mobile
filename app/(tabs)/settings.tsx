import * as React from 'react';
import { Linking, Platform } from 'react-native';
import List, { ListHeader } from "@/components/ui/list";
import ListItem from "@/components/ui/list-item";
import { Muted } from "@/components/ui/typography";
import { ScrollView } from 'react-native-gesture-handler';
import { Bell, BookOpen, Send, Shield, AlertTriangle, Star } from 'lucide-react-native';
import * as WebBrowser from "expo-web-browser";

import { ThemeSettingItem } from '@/components/settings/ThemeItem';
import { NotificationItem } from '@/components/settings/NotificationItem';

export default function Settings() {
  const openExternalURL = (url: string) => {
    if (Platform.OS === "web") {
      Linking.openURL(url);
    } else {
      WebBrowser.openBrowserAsync(url);
    }
  };
  return (
    <ScrollView className="flex-1 w-full px-6 bg-background pt-4 gap-y-6">
      <List>
        <ListHeader>
          <Muted>App</Muted>
        </ListHeader>
        <ThemeSettingItem />
        {
          Platform.OS !== "web" && <NotificationItem />
        }

        <ListHeader className='pt-8'>
          <Muted>AVALANCHE INFO</Muted>
        </ListHeader>
        <ListItem
          itemLeft={(props) => <AlertTriangle {...props} />}
          label="Visit CBAC Website"
          onPress={() => openExternalURL("https://cbavalanchecenter.org/")}
        />
        <ListItem
          itemLeft={(props) => <BookOpen {...props} />}
          label="Avalanche Education"
          onPress={() => openExternalURL("https://cbavalanchecenter.org/education/")}
        />

        <ListHeader className='pt-8'>
          <Muted>ABOUT</Muted>
        </ListHeader>
        <ListItem
          itemLeft={(props) => <Shield {...props} />}
          label="Privacy Policy"
          onPress={() => openExternalURL("https://cbavalanchecenter.org/privacy-policy/")}
        />
        <ListItem
          itemLeft={(props) => <Send {...props} />}
          label="Contact CBAC"
          onPress={() => openExternalURL("https://cbavalanchecenter.org/contact/")}
        />
      </List>
    </ScrollView>
  );
}
