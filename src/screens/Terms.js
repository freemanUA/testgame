import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Body, Button, Container, Content, Header, Icon, Left, Right, Spinner, Title } from 'native-base';
import { BUTTONS_COLOR, TEXT_COLOR } from '../Config';
import { acceptTermsPressed } from '../actions/UserSignUpActions';

class Terms extends Component {
    renderButton() {
        if (this.props.loading) {
            return <Spinner color='green' />;
        }
        return (
            <Button
                block
                style={styles.button}
                onPress={() => this.props.acceptTermsPressed()}
            >
                <Text
                    style={styles.buttonText}
                >
                    ACCEPT
                </Text>
            </Button>
        );
    }

    render() {
        return (
            <Container
                contentContainerStyle={styles.container}
            >
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon
                                name="ios-arrow-round-back"
                                style={styles.icon}
                            />
                        </Button>
                    </Left>

                    <Body>
                        <Title
                            style={styles.headerText}
                        >
                            TERMS AND CONDITIONS
                        </Title>
                    </Body>
                    <Right />
                </Header>
                <View style={[styles.container, { flex: 1 }]}>
                    <View style={styles.upperBlock}>
                        <Text style={styles.upperText}>In order to proceed registration please</Text>
                        <Text style={styles.upperText}>review and accept T&Cs</Text>
                    </View>
                    <Content contentContainerStyle={styles.termsContainer}>
                        <Text style={styles.TCText}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolorem dolorum est excepturi impedit obcaecati, omnis optio quis quisquam quo quod repellendus repudiandae rerum voluptatibus voluptatum! Cumque, ex labore. Beatae consectetur deserunt dolorum eius enim esse eum eveniet explicabo facere fuga in inventore iure, mollitia officia perferendis quas quidem sapiente sed sit velit. Ab aperiam aut, delectus eius enim eum nihil officiis repellendus saepe totam! Corporis error expedita magnam maxime minima obcaecati voluptatibus voluptatum! Distinctio dolorum earum enim et illum libero magnam maiores nostrum odio officiis quibusdam quisquam quod quos reprehenderit, repudiandae tempore vel. Ab autem ipsam maxime provident quaerat? Debitis enim illum nesciunt reprehenderit sed sit velit voluptatum? Aperiam beatae consequuntur dolore eligendi fugit illum ipsa iste natus numquam provident, quidem, reiciendis rem, repudiandae sint tempora vel velit. Adipisci atque cum deserunt dolorem doloremque, laboriosam laborum natus necessitatibus officia pariatur perferendis perspiciatis praesentium quisquam quo quos rem veritatis. A architecto aut consequuntur cumque, dolore eum excepturi ipsum itaque laboriosam magni nulla odio qui quia quibusdam quos ratione vel, vitae. Atque corporis ea eius exercitationem magnam modi odit praesentium voluptates! Aliquam asperiores debitis deleniti dignissimos ea eveniet excepturi illo, ipsa itaque laborum maxime necessitatibus nihil non odit perferendis rem ullam voluptas! Ad atque culpa dolor eligendi esse explicabo fugiat id molestias necessitatibus nobis obcaecati perspiciatis ratione recusandae, repudiandae rerum sed sunt veritatis voluptatibus. Accusamus adipisci aliquid consequatur corporis culpa dignissimos distinctio dolorum ducimus enim, eveniet expedita explicabo facilis harum, id laborum maxime, molestias nostrum officia officiis omnis pariatur praesentium quia quis repellat saepe sint vel voluptatem. Eius eveniet labore officiis quia repudiandae soluta, suscipit ut voluptatum! Accusantium asperiores aspernatur, commodi consectetur eum excepturi incidunt iusto maxime nostrum qui, quidem, quod rerum unde. Ad impedit placeat quidem sunt. Aliquid atque consequuntur deserunt doloremque dolores dolorum hic minus mollitia necessitatibus repellendus? A ad aspernatur consectetur cum delectus dolore dolorem earum eius ex exercitationem illo iste iusto labore, laborum maiores minima minus molestias provident qui quis quo ut vero voluptates. At beatae cumque necessitatibus odit praesentium quaerat reiciendis similique tempore temporibus totam. Aliquid beatae consectetur, deleniti, dolore dolorum ducimus error eveniet facilis in laboriosam laborum minima, molestiae nesciunt nihil obcaecati pariatur porro quas quidem. A aperiam aspernatur at blanditiis ipsa modi, mollitia numquam similique voluptas voluptate. Accusantium, at aut consectetur debitis dicta dolor dolorem dolores exercitationem harum ipsa iste, labore, laboriosam magni maiores maxime modi numquam officiis quam quasi quia recusandae repudiandae sunt suscipit! A alias, dignissimos doloremque dolores eaque, eos incidunt inventore nesciunt non nulla numquam ratione rem repellendus sint totam vel veniam veritatis? Adipisci corporis eligendi ex facilis id nemo neque, nihil odio perspiciatis provident quod sapiente, sequi sunt veritatis voluptates? Accusamus architecto aspernatur aut deleniti dicta, ducimus ea eaque eum fuga in inventore, itaque labore laboriosam magnam maiores maxime molestias neque nihil nostrum obcaecati officia perspiciatis quam qui quia quisquam recusandae repellat reprehenderit sequi, sint tempore temporibus tenetur veritatis voluptates. Ab accusantium architecto beatae deleniti dolore dolores doloribus earum eos explicabo hic impedit ipsa laboriosam maxime nam nemo, odio, perspiciatis, quisquam sed similique sit soluta sunt voluptate voluptatibus! Assumenda commodi ducimus excepturi expedita, id iste nihil nisi possimus qui, ratione, sed soluta tempora tenetur voluptas voluptatum. Accusamus ad atque aut ducimus, illo ipsa ipsam itaque iusto qui velit. Amet aspernatur assumenda autem corporis debitis dolor est, eveniet excepturi fuga illo laboriosam minus mollitia, nihil non optio perferendis quas quos recusandae reiciendis repellat saepe sapiente sed sit tempora tempore voluptate voluptatum! Blanditiis delectus dolor ducimus illum itaque magnam magni sed, tenetur ullam voluptatum! Alias atque autem beatae cupiditate dicta enim est eveniet illo in iste nihil nulla pariatur, perferendis perspiciatis praesentium quae quaerat quam quisquam rem reprehenderit sapiente similique tempora tempore tenetur, voluptas! Ad distinctio est eum itaque iusto laudantium nam nisi odio! Amet blanditiis facere, iusto molestiae quisquam rerum? Adipisci architecto aspernatur assumenda aut deleniti deserunt dignissimos, dolor eaque explicabo iste numquam odit quis quisquam tempora veritatis vitae voluptas. Accusamus aperiam aut cumque delectus deserunt eius facilis incidunt iure molestias, natus nesciunt quae recusandae similique tempore veritatis. Dolorem fuga laudantium magnam molestias, quam rem repudiandae similique veniam. Ad atque consequatur error, laborum neque rem sint sit voluptas voluptatem! Animi assumenda autem blanditiis consectetur dolorem earum iusto laboriosam laborum molestias, nobis non nulla obcaecati odit, porro praesentium quae ratione rem sint sit tempore vel velit voluptatum. Architecto assumenda cum delectus deleniti, dolor ea, eaque et excepturi fuga nemo quod repudiandae ut voluptatibus. Facilis maiores, perferendis? Aliquam cum dignissimos dolor dolore, et facere harum id illo incidunt ipsa laudantium libero nesciunt nostrum optio pariatur perspiciatis qui quia totam vero vitae! Accusamus, eius eligendi eos, error ex fuga fugit id impedit iste nostrum obcaecati quae quidem rem repellendus, saepe sequi tempore! A aliquid necessitatibus temporibus! Adipisci amet animi consequatur consequuntur cupiditate, eius eos, esse, illo in maxime natus perferendis placeat possimus quasi reiciendis sequi sint! Consequuntur doloribus error fugit quidem. Accusantium adipisci atque cumque dignissimos, error harum impedit non. A animi aperiam atque, blanditiis corporis cupiditate dolore error expedita fuga hic illo ipsa ipsam iste, laboriosam molestiae odio optio perferendis quaerat, quas quibusdam ratione reiciendis temporibus ullam vel voluptas. Corporis dignissimos, dolore dolorum incidunt iste non quisquam sequi vero. Adipisci deleniti error eum eveniet ex exercitationem harum iure laborum necessitatibus nemo perspiciatis quaerat quasi, quo suscipit voluptates! Ab accusamus aliquam aspernatur assumenda at atque consectetur consequatur corporis dicta dignissimos dolor dolorem dolores earum eius eos est ex impedit iure laudantium minima nobis odit omnis optio quasi, quibusdam quod reiciendis repellendus saepe sapiente, sequi sunt tempora unde veritatis voluptas voluptate voluptatem voluptates. Accusantium debitis eos explicabo maxime omnis sapiente soluta tempore. Adipisci aliquid atque culpa distinctio, dolorum ducimus enim et harum, illo iure laboriosam minima nostrum quae quasi qui recusandae, totam ut veniam! Aut, beatae consequuntur culpa dolores, doloribus exercitationem iste iusto neque nihil quae sint temporibus. Accusantium amet atque dolore earum enim ipsum, necessitatibus neque provident quis ratione? A architecto commodi corporis ducimus hic ipsa laboriosam maiores mollitia obcaecati perspiciatis quaerat sapiente sequi sint tempore unde vitae, voluptas! Assumenda cum earum porro repellendus.
                        </Text>
                    </Content>
                    {this.renderButton()}
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'white'
        },
        icon: {
            color: TEXT_COLOR
        },
        headerText: {
            fontSize: 14,
            color: TEXT_COLOR
        },
        upperBlock: {
            margin: 30
        },
        upperText: {
            alignSelf: 'center',
            color: TEXT_COLOR
        },
        termsContainer: {
            margin: 20,
            backgroundColor: 'white'
        },
        button: {
            backgroundColor: BUTTONS_COLOR,
            marginLeft: 60,
            marginRight: 60,
            marginTop: 30,
            marginBottom: 30
        },
        buttonText: {
            color: TEXT_COLOR,
            fontWeight: 'bold'
        },
        TCText: {
            color: TEXT_COLOR
        }
    }
);

const mapStateToProps = (state) => {
    const { toast } = state.Service;
    const { loading } = state.UserSignUp;

    return { toast, loading };
};
export default connect(mapStateToProps, { acceptTermsPressed })(Terms);
