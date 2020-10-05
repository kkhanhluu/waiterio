import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import TableOrderCreate from '../TableOrderCreate/TableOrderCreate';
import TableOrderGeneral from '../TableOrderGeneral/TableOrderGeneral';

const TableOrder: React.FC<{ match: any }> = (props) => {
  if (props && props.match && props.match.params.id) {
    console.log('table order', props);
    return (
      <IonTabs>
        <IonRouterOutlet>
          <Route
            path='/tables/:area/:id/general'
            component={TableOrderGeneral}
            exact
          />
          <Route
            path='/tables/:area/:id/ordering'
            component={TableOrderCreate}
            exact
          />
          {/* <Redirect
            to={`/tables/${props.match.params.area}/${props.match.params.id}/general`}
          /> */}
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton
            tab='general'
            href={`/tables/${props.match.params.area}/${props.match.params.id}/general`}
          >
            <IonLabel>General</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab='ordering'
            href={`/tables/${props.match.params.area}/${props.match.params.id}/ordering`}
          >
            <IonLabel>Menu</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
  }
  return null;
};
export default TableOrder;
