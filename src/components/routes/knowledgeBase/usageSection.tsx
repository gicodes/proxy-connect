import React from 'react';

export const UsageSection = () => {
  return (
    <>
        <span className="block">
            Navigating, exploring or even troubleshooting on the ProxyConnect platform is simple and straightforward.
            When exploring the app, you can find references or links to great documentations and guide— we reckon you use them.
            When networking, ProxyConnect analytics will randomly take feedback from users that help in optimizing the features and quality of our services.
        </span>
        <span className="subtitle-aura">
            <b>How to Start </b>
        </span>
        <span className="block mt-4">
            Users can start ProxyConnect instantly from <a href="/console" className="text-warning"><b>console</b></a>.
            By simply navigating or exploring the app, you will be occasionally prompted to sign in or sign up, if you do not have an account.
            Signing in would give you access to <a href="/connect" className="text-success"><b>connect</b></a> with your desired service. 
        </span>
        <span>
            High-end users i.e. third-party platforms that are looking to consume ProxyConnect's network and APIs must be authenticated.
            A new tier of user accounts that support serverless functions will be rolled out by <u>January, 2025</u>.
        </span>
        <span className="block mt-2">
            This application's interface and performance is bound to better with every update-- focused on improving user experience.
        </span>
    </>
  )
}