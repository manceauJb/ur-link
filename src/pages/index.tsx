import { FormEvent, ReactElement } from 'react'
import Head from 'next/head'
import BaseLayout from '@/components/layouts/BaseLayout'
import { Box, Button, Card, CardBody, CardHeader, Container, Flex, Heading, Image, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react'

export default function Home() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Ur-Link</title>
        <meta name="description" content="personnal project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        direction={['column-reverse', 'row']}
        alignItems="center"
        justifyContent="center"
        minH="50vh"
        gap={4}
        mb={8}
        w="full"
      >
        <Card>
          <CardHeader>
            <Heading fontSize='2xl'>
              Un lien en bio qui vous rapporte de l’argent
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Un outil de lien en bio gratuit et personnalisable.
            </Text>
          </CardBody>
        </Card>

        <Box>
          <Image src="https://picsum.photos/400/400" alt="random.picsum" />
        </Box>
      </Flex>

      <Container ml={0}>
        <form onSubmit={handleSubmit}>
          <Flex direction={['column', 'column', 'row']} alignItems="start" gap={3}>
            <InputGroup>
              <InputLeftAddon>
                ur-link/
              </InputLeftAddon>
              <Input placeholder='mon-entreprise' />
            </InputGroup>
            <Button type="submit" minW="4xs">
              Réserver mon lien
            </Button>
          </Flex>
        </form>
      </Container>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return (
    <BaseLayout>
      {page}
    </BaseLayout>
  )
}
