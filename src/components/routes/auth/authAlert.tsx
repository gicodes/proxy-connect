import { Alert, Box, AlertTitle, AlertIcon, AlertDescription, Text } from "@chakra-ui/react"


const AuthAlert = () => {
  return (
    <>
          <Alert mt="5" status="info">
                <Box>
                  <AlertTitle mb="2" display="flex" justifyContent={"space-between"}>
                    <AlertIcon mt="1" boxSize="4" />
                    <h6 className="w-100 text-center">
                      Why multiple sign-in options?
                    </h6>
                  </AlertTitle>
                  <hr />
                  <AlertDescription>
                    <Text paddingTop="4" fontSize="12.3">
                      <b>Sign in with credentials</b> allow default login with valid username and password. 
                      {/* <span className="text-not-valid block">(Not recommended)</span> */}
                    </Text>
                    <Text paddingTop="4" fontSize="12">
                      <b>Sign in with google</b> allow sign in with
                      google account. Redirects to google origin. 
                      <span className="text-valid block">(Recommended)</span>
                    </Text>
                  </AlertDescription>
                </Box>
              </Alert>
    </>
  )
}

export default AuthAlert;