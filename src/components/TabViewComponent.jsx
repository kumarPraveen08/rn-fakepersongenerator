import * as React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../hooks/useTheme';
import TabContentComponent from './TabContentComponent';

export default function TabViewComponent({data}) {
  const layout = useWindowDimensions();
  const theme = useTheme();

  const FirstRoute = () => (
    <TabContentComponent data={data.personal} title="Personal Details" />
  );

  const SecondRoute = () => (
    <TabContentComponent data={data.phone} title="Phone Details" />
  );

  const ThirdRoute = () => (
    <TabContentComponent data={data.internet} title="Internet Details" />
  );

  const FourthRoute = () => (
    <TabContentComponent data={data.card} title="Finance Details" />
  );

  const FifthRoute = () => (
    <TabContentComponent data={data.others} title="Others" />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    fifth: FifthRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Personal Details', icon: 'account'},
    {key: 'second', title: 'Phone Details', icon: 'phone'},
    {key: 'third', title: 'Internet Details', icon: 'web'},
    {key: 'fourth', title: 'Card Details', icon: 'credit-card'},
    {key: 'fifth', title: 'Others', icon: 'more'},
  ]);

  const renderTabBar = ({key, ...props}) => {
    return (
      <TabBar
        {...props}
        renderLabel={({route, focused, color}) => (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={route.icon} size={20} color={theme.text} />
          </TouchableOpacity>
        )}
        indicatorStyle={{backgroundColor: theme.text}}
        style={{backgroundColor: theme.light}}
        activeColor={theme.text}
        inactiveColor={theme.border}
      />
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
}
