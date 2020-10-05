import React, { useState } from 'react';
import {
  IonIcon,
  IonLabel,
  IonSplitPane,
  IonMenu,
  IonMenuToggle,
  IonItem,
  IonPage,
  IonList,
} from '@ionic/react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { Menu } from '../../components/Menu/Menu';
import { Orders } from '../../components/Orders/Orders';
import TableOrder from '../../components/TableOrder/TableOrder';
import { receiptOutline, listOutline } from 'ionicons/icons';
import TableOrderCreate from '../../components/TableOrderCreate/TableOrderCreate';
import TableOrderGeneral from '../../components/TableOrderGeneral/TableOrderGeneral';

const pages = [
  { title: 'orders', path: '/orders', icon: receiptOutline },
  { title: 'menu', path: '/menu', icon: listOutline },
];
export const Home: React.FC<any> = (props) => {
  const [activePage, setActivePage] = useState('orders');

  const navigateToPage = (page: any) => {
    props.history.push(page.path);
    setActivePage(page.title);
  };

  const renderMenuItems = (): JSX.Element[] => {
    return pages.map((page) => (
      <IonMenuToggle key={page.title}>
        <IonItem
          button
          color={activePage === page.title ? 'primary' : ''}
          onClick={() => navigateToPage(page)}
          detail={false}
        >
          <IonIcon slot='start' icon={page.icon}></IonIcon>
          <IonLabel>{page.title}</IonLabel>
        </IonItem>
      </IonMenuToggle>
    ));
  };

  return (
    <IonSplitPane contentId='main'>
      <IonMenu side='start' contentId='main' menuId='mainMenu'>
        <IonList>{renderMenuItems()}</IonList>
      </IonMenu>

      <IonPage id='main'>
        <Switch>
          <Route path='/menu' component={Menu} exact={true} />
          <Route path='/orders' component={Orders} exact={true} />
          <Route path='/tables/:area/:id' component={TableOrder} />
          <Redirect from='/' to='/orders' />
        </Switch>
      </IonPage>
    </IonSplitPane>
  );
};

export default withRouter(Home);
