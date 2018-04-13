import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Text,
} from 'native-base';

export default class Leaderboard extends Component {
    render() {
        return(
            <Container>
                <Header/>
                <Content>
                    <Text>
                    Let's assume that our SlackIcon class is located in my-project/components/SlackIcon.js, and our icon images are in my-project/assets/images, in order to refer to the image we use require and include the relative path. You can provide versions of your icon at various pixel densities and the appropriate image will be automatically used for you. In this example, we actually have slack-icon@2x.png and slack-icon@3x.png, so if I view this on an iPhone 6s the image I will see is slack-icon@3x.png. More on this in
                    </Text>
                </Content>
            </Container>
        );
    }
}