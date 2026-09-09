declare module '@react-native-picker/picker' {
  import * as React from 'react';

  type PickerItemProps = {
    label: string;
    value: string | number;
    color?: string;
  };

  class Picker extends React.Component<any> {
    static Item: React.FC<PickerItemProps>;
  }

  export { Picker };
}
