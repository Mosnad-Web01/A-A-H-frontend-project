import { Box, Container, VStack, HStack, Text, Link, Image, Heading, useColorMode } from '@chakra-ui/react';

const Footer = () => {
  const { colorMode } = useColorMode(); 

  return (
      

      
  
    <Box
      as="footer"
      className="bg-gray-900"
      color={colorMode === 'dark' ? 'gray.200' : 'gray.800'}
      borderTop="1px"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.300'}
      background={colorMode === 'light' ? 'gray.200' : 'gray.800'}
      mt={5}
    >

        <Container maxW="container.xl mt-2" p={8}>
          <VStack spacing={6} textAlign="center" className='mt-4'>
            {/* Title Section */}
            <Heading
              as="h3"
              fontSize="lg"
              fontWeight="semibold"
              color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
            >
              Meet the Team
            </Heading>

            {/* Team Members Section */}
            <HStack
              spacing={8}
              className="justify-center space-y-4 md:space-y-0 flex-col md:flex-row"
            >
              {/* Array of team members */}
              {[
                { name: 'Abdulaziz-ALhashedi', github: 'https://github.com/Hash-Ezz', linkedin: 'https://linkedin.com/in/abdulaziz-alhashedi' },
                { name: 'Alselmi0', github: 'https://github.com/Alselmiy0', linkedin: 'https://linkedin.com/in/Alselmi0' },
                { name: 'Hana Alhemyari', github: 'https://github.com/HanaAlhemyari', linkedin: 'https://linkedin.com/HanaAlhemyari' },
              ].map((member, index) => (
                <VStack key={index} spacing={2} className="text-center">
                  <Text className="font-semibold text-lg text-white">
                    {member.name}
                  </Text>
                  <HStack spacing={4}>
                    {/* GitHub Link */}
                    <Link href={member.github} isExternal className="hover:opacity-80">
                      <Image
                        src="/icons/github.png"
                        alt="GitHub"
                        boxSize="24px"
                        className="transition-transform duration-200 hover:scale-110 rounded-sm"
                      />
                    </Link>
                    {/* LinkedIn Link */}
                    <Link href={member.linkedin} isExternal className="hover:opacity-80">
                      <Image
                        src="/icons/linkdin.png"
                        alt="LinkedIn"
                        boxSize="24px"
                        className="transition-transform duration-200 hover:scale-110  rounded-md border-2"
                      />
                    </Link>
                  </HStack>
                </VStack>
              ))}
            </HStack>

            {/* Copyright Section */}
            <Text fontSize="sm" className="text-gray-400 mt-4">
              &copy; {new Date().getFullYear()} A-A-H-MovieApp. All rights reserved.
            </Text>
          </VStack>
        </Container>
      </Box>
  );
};

export default Footer;
