import React, {Component} from 'react';
import {StyleSheet, Clipboard, Share} from 'react-native';
import {
  Container,
  Content,
  Header,
  Card,
  CardItem,
  Body,
  Text,
  Icon,
  Button,
  Left,
  Right,
  Thumbnail,
  Title,
  Toast,
} from 'native-base';
import QRCode from 'react-native-qrcode-svg';

export default class ReceiveScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const wallet = this.props.navigation.state.params;

    return (
      <Container style={styles.container}>
        <Header
          style={{
            backgroundColor: 'black',
          }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-camera-outline" />
            </Button>
          </Left>
          <Body style={{marginLeft:70}}>
            <Title>{wallet.symbol} 입금</Title>
          </Body>
        </Header>
        <Content padder>
          <Card transparent>
            <CardItem>
              <Body style={styles.center}>
                <Thumbnail
                  circle
                  source={{
                    uri:
                      'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
                  }}
                />
              </Body>
            </CardItem>
            <CardItem>
              <Body style={[styles.center, {marginVertical: 20}]}>
                <QRCode
                  value={wallet.address}
                  bgColor="black"
                  fgColor="white"
                  size={200}></QRCode>
              </Body>
            </CardItem>
            <CardItem>
              <Body
                style={
                  ([styles.center], {padding: 10, backgroundColor: '#EFEFEF'})
                }>
                <Text
                  note
                  onPress={() => {
                    Clipboard.setString(wallet.address);
                    Toast.show({
                      text: '주소가 복사가 완료되었습니다.',
                      position: 'bottom',
                      duration: 1000,
                    });
                  }}>
                  {wallet.address}
                  <Icon
                    name="content-copy"
                    type="MaterialCommunityIcons"
                    style={{fontSize: 15, color: '#777'}}
                  />
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  bordered
                  info
                  block
                  style={{marginHorizontal: 100}}
                  onPress={() => {
                    Share.share({message: wallet.address});
                  }}>
                  <Text>주소 공유</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
