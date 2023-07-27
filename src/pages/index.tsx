import { ReactElement } from 'react';
import Head from 'next/head';
import BaseLayout from '@/components/layouts/BaseLayout';
import Feature from '@/components/Feature';

import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Container,
    Flex,
    Heading,
    Icon,
    Image,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { FcAlarmClock, FcBearish, FcViewDetails } from 'react-icons/fc';

const Home = () => (
    <>
        <Head>
            <title>Ur-Link</title>
            <meta name="description" content="personnal project" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <VStack gap={100} mb={100} mt={[50, 100]}>
            <Flex
                direction={['column-reverse', 'column-reverse', 'row']}
                alignItems="center"
                justifyContent="center"
                minH="50vh"
                gap={10}
                w="full"
            >
                <Card rounded={[null, null, 'lg']} maxW={['', '', 'md']}>
                    <CardHeader>
                        <Heading fontSize="2xl">
                            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
                            laoreet nisi. Vivamus hendrerit leo turpis. Sed turpis ex, suscipit id
                            nisi vitae, pharetra rutrum lacus. Sed nec varius augue. Donec finibus
                            eget velit nec venenatis.
                        </Text>
                    </CardBody>
                </Card>

                <Box px={5}>
                    <Image src="https://picsum.photos/400/400" alt="random.picsum" />
                </Box>
            </Flex>

            <Box bg={useColorModeValue('gray.50', 'gray.900')} width="100%" p="2em">
                <Container>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis laoreet
                        nisi. Vivamus hendrerit leo turpis. Sed turpis ex, suscipit id nisi vitae,
                        pharetra rutrum lacus. Sed nec varius augue. Donec finibus eget velit nec
                        venenatis.
                    </Text>
                    <Text>
                        Cras eleifend sapien felis, vel semper eros lacinia eget. Quisque ut
                        interdum tellus. Integer neque nisl, accumsan a finibus sit amet,
                        ullamcorper eu sem. Class aptent taciti sociosqu ad litora torquent per
                        conubia nostra, per inceptos himenaeos. Donec vitae congue ipsum. Curabitur
                        consectetur ante eget tellus auctor ultrices. Fusce malesuada nibh quis
                        augue dapibus consequat.
                    </Text>
                </Container>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="70vw">
                <Feature
                    icon={<Icon as={FcBearish} w={10} h={10} />}
                    title={'Stats tracker'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <Feature
                    icon={<Icon as={FcViewDetails} w={10} h={10} />}
                    title={'Unlimited Donations'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <Feature
                    icon={<Icon as={FcAlarmClock} w={10} h={10} />}
                    title={'Instant Delivery'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
            </SimpleGrid>
        </VStack>
    </>
);

Home.getLayout = (page: ReactElement) => {
    return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
