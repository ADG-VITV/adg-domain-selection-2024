import { Box, Flex, Text } from "@chakra-ui/react"


const Footer = () => {
  return (
    <footer>
  <Box height={10} bg="black" color="white" p={4}  fontSize={["sm", "md"]} fontWeight="600">
    <Flex justifyContent="space-around" alignItems="center" height="100%">
      
      
      <Text>For any queries, kindly mail us at ios@vit.ac.in</Text>
    </Flex>
  </Box>
</footer>

  )
}

export default Footer