import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';
import React from 'react';

interface MenuCategoryProps {
  category: string;
  dishes: any[];
}

const MenuCategory: React.FC<MenuCategoryProps> = (props) => {
  console.log(props.dishes);

  let categoryName = '';
  switch (props.category) {
    case 'drink':
      categoryName = 'Đồ uống';
      break;
    case 'riceAndNoddle':
      categoryName = 'Cơm và mỳ';
      break;
    case 'soup':
      categoryName = 'Soup';
      break;
    case 'special':
      categoryName = 'Special';
      break;
  }

  const displayPrice = (dish: any) => {
    if (dish.priceBig && dish.priceSmall) {
      return `${dish.priceBig}€ / ${dish.priceSmall}€`;
    } else if (dish.price) {
      return `${dish.price}€`;
    }
  };

  return (
    <IonList>
      <IonListHeader>{categoryName}</IonListHeader>

      {props.dishes.map((dish) => (
        <IonItem key={dish.number}>
          <IonLabel>
            <h2>
              {dish.number}. {dish.title}
            </h2>
            <h3 className='ion-text-wrap'>{dish.description}</h3>
            <p>{displayPrice(dish)}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default MenuCategory;
