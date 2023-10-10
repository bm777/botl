import QRCode from 'react-native-qrcode-svg';

const CreateQR = (props) => {
    const { url, size } = props

    return (
      <QRCode
        value={url.toString()}
        size={size}
      />
    );
  };
export default CreateQR;
