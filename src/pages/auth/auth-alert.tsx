import { Alert, Box, AlertTitle, AlertIcon, AlertDescription, Text } from "@chakra-ui/react"


const AuthAlert = () => {
  return (
    <>
          <Alert mt="5" status="info">
                <Box>
                  <AlertTitle mb="2" display="flex">
                    <AlertIcon mt="1" boxSize="4" />
                    Why multiple sign in options?
                  </AlertTitle>
                  <hr />
                  <AlertDescription>
                    <Text paddingTop="4" fontSize="12.3">
                      <b>Sign in with credentials</b> allow default login for
                      user accounts created using a username and password. 
                      <span className="text-not-valid block">(Not recommended)</span>
                    </Text>
                    <Text paddingTop="4" fontSize="12">
                      <b>Sign in with google</b> allows login or registering a
                      user account with existing gmail. Redirects to google. 
                      <span className="text-valid block">(Recommended)</span>
                    </Text>
                  </AlertDescription>
                </Box>
              </Alert>
    </>
  )
}

export default AuthAlert;