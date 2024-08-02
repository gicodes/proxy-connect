import React from 'react';

export const UsageSection = () => {
  return (
    <>
        <span className="block">
            Navigating, exploring or even troubleshooting on the ProxyConnect platform is simple and straightforward.
            When exploring the app, you can find references or links to great documentations and guide— we reckon you use them.
            When networking, ProxyConnect analytics will randomly take feedback from users that help in optimizing the features and quality of our services.
        </span>
        <br/>
        <span className="subtitle-aura">
            <b>How to Start </b>
        </span>
        <span className="block mt-2">
            To start ProxyConnect instantly, navigate to <a href="/console" className="text-yellow-200">console</a> and click on the switch button. 
            You will be required to turn on the location service on your device to authorize this protocol. However, if you are not signed in, you will be 
            prompted to do so, and eventually redirected back to the page when the sign-in process is successful.
        </span>
        <span className='block mt-2'>
            By simply navigating or exploring the app, you will be occasionally prompted to sign in to have access to certain areas of the app.
            Signing in would give you access to <a href="/connect" className="text-green-300">connect</a> with your desired service. 
        </span>
        <span className='block mt-3'>
            High-end users i.e. third-party platforms that are looking to consume ProxyConnect's network and APIs must be authenticated.
            A new tier of user accounts that support serverless functions will be rolled out by <u>January, 2025</u>.
        </span>
        <span className="block mt-2">
            This application's interface and performance is bound to be better with every update--- focused on improving user experience.
        </span>
    </>
  )
}