import { Heading, Text } from "@chakra-ui/react";

function mailTo() {
  window.location.href = "mailto:gicodes9@gmail.com";
}

const inbox = () => {
  return (
    <>
      <Heading className="flex flex-1 justify-center px-4 py-8 lg:px-8">
        Documentation
      </Heading>
      <hr />

      <main className="container-fluid mb-12 position-absolute h-100 bg-light">
        <section id="summary">
          <Heading
            mt={"3"}
            fontSize={"x-large"}
            className="flex flex-1 justify-center px-4 py-4 lg:px-8"
          >
            Summary
          </Heading>
          <Heading fontSize={"medium"} className="sub-heading">
            Who is Ryder-GP?
          </Heading>
          <Text mt={"2"}>
            Ryder-GP is a free{" "}
            <a href="https://nextjs.com">
              <u>NEXT</u>
            </a>{" "}
            service built to bring solutions to business logistics and security.
          </Text>
          <Text mt={"1"}>
            {" "}
            Users are connected to a real-time geo-based system that makes it
            simple to send and receive location data with google map.
          </Text>
          <Text mt={"1"}>
            Registration and authentication is pretty straight-forward and the
            in-app functionality is user-friendly. The application interface and
            performance will get better with every update- focused on improving
            user experience. So the feedback we get from users are important.
          </Text>
        </section>

        <section id="logistics">
          <Heading
            mt={"3"}
            fontSize={"x-large"}
            className="flex flex-1 justify-center px-4 py-4 lg:px-8"
          >
            Logistics
          </Heading>
          <Text>
            {" "}
            The idea behind Ryder-GP is a peer-to-peer communication between
            clients. A client could be a user who want to send goods out and
            need a fast service, or a client could be a service provider who
            need customers. Whatever the case, Ryder-GP brings an in-house
            solution for either party. By signing in and connecting, clients can
            see available ryders or search for the ones nearby. A ryder must be
            checked-in to send or recieve any service request, making it easy to
            be searched, seen or located.
          </Text>
        </section>

        <section id="security">
          <Heading
            mt={"3"}
            fontSize={"x-large"}
            className="flex flex-1 justify-center px-4 py-4 lg:px-8"
          >
            Security
          </Heading>
          <Text>
            {" "}
            Users can sign up to use or test the application without any
            security concerns. Ryder-GP runs on serverless functions which mean
            that network connections are safe and fast, and user information is
            securely collected and stored by{" "}
            <a href="https://mongodb.com">
              <b>MongoDB Atlas</b>
            </a>
            .{" "}
          </Text>
        </section>

        <section id="functionality">
          <Heading
            mt={"3"}
            fontSize={"x-large"}
            className="flex flex-1 justify-center px-4 py-4 lg:px-8"
          >
            Functionality
          </Heading>
          <Heading fontSize={"medium"} className="sub-heading">
            How do I start?
          </Heading>
          <Text mt={"1"}>
            Whether you are a regular user or ryder user, you only need basic
            user info- your name, valid email, a unique username and password to
            sign up. When the registration is complete, you will be redirected
            to sign in and then routed to dashboard after signing in with the
            correct user info.
          </Text>
          <Heading fontSize={"medium"} className="sub-heading">
            Dashboard
          </Heading>
          <Text mt={"1"}>
            On the dashboard, you would see an alert at the top of the page-
            prompting you to check-in in two steps. Check-in(1) turns on
            location permission when you allow it on your browser settings. You
            can choose to ignore it, but will have limited access to services.
            Check-in(2) takes you online i.e. redirects to the explore page
            where you can interact with other users.
          </Text>
          <Heading fontSize={"medium"} className="sub-heading">
            Explore
          </Heading>
          <Text mt={"1"}>
            On explore, if you are a regular, you can see ryders who are online
            and ping them your request as a service. Service requests time out
            after 60 seconds before you can try again. When ryders accept
            requests, they basically consent to sharing their location data for
            the entirety of the service. This means while the service is
            on-going, ryder activity is being monitored and recorded. It also
            implys that both regulars and ryders can be rated after service.
          </Text>{" "}
          <section id="ratings">
            <Heading fontSize={"medium"} className="sub-heading">
              Ratings
            </Heading>
            <Text mt={"1"}>
              Ratings can boost a users revenue potential. They are critical to
              user experience as it affects how regulars and ryders interact
              with the system. Regulars with good rating score get discount for
              services and ryders get tips and bonus for good rating scores. At
              the end of the week, users can see their ratings.
            </Text>
          </section>
          <section id="revenue">
            <Heading fontSize={"medium"} className="sub-heading">
              Revenue
            </Heading>
            <Text mt={"1"}>
              Revenue play a huge part for any service provider and so we have
              designed a system where users can generate revenue by interacting
              with other users. Payments for services can be pay-as-you-go or it
              can be prepaid, which means users can fund their purse. Regulars
              earn from interest rate on net spending and savings- a percenatge
              is paid on interest. On the other hand, ryders generate revenue
              from services completed and tips earned- which is relative to the
              number of services completed and good rating.
            </Text>
            <section id="subscription">
              <Heading fontSize={"medium"} className="sub-heading">
                Subscription
              </Heading>
              <Text mt={"1"}>
                Ryder-GP includes subscription-based services for users. It
                starts after 1 month of completely free service and only cost 5%
                of the period valuation. Ryders are allowed to work a maximum of
                10 hours per week or 2 hours per day. However, with an active
                subscription, a ryder can work a total of 30 hours or 6 hours
                per day. Subscriptions also let ryders receive high-paying gigs
                and accept tips. However for regulars, subscription is not
                mandatory to send service request. A regular will only need to
                subscribe when looking to fund their purse, save or generate
                revenue.
              </Text>
            </section>
          </section>
        </section>

        <section id="features">
          <Heading
            mt={"3"}
            fontSize={"x-large"}
            className="flex flex-1 justify-center px-4 py-4 lg:px-8"
          >
            Features
          </Heading>
          <Text mt={"1"}>
            Some of the features in Ryder-GP are not stable yet nor ready to
            use. The necessary data needed to support these functions are still
            being gathered for quality assurance and testing.
          </Text>
        </section>

        <section id="developer">
          <Heading
            mt={"3"}
            fontSize={"x-large"}
            className="flex flex-1 justify-center px-4 py-4 lg:px-8"
          >
            Developer
          </Heading>
          <Text mt={"1"}>
            This project is open-source and constantly in development. It is
            currently open to contributions, partnerships or sponsorship.
          </Text>
          <Heading fontSize={"medium"} className="sub-heading">
            How can a developer contribute?
          </Heading>
          <Text mt={"1"}>
            Developers can contribute to this project by writing clean and
            scalable codes, data structure- algorithims that support the
            application, design themes and flow patterns that are likened to
            client demand, design new products and logic that can help to scale
            the application and generate revenue.
          </Text>
          <Heading fontSize={"medium"} className="sub-heading">
            Technology Stack
          </Heading>
          <Text mt={"1"}>
            {" "}
            Ryder-GP is primarily built on Nextjs using Typescript for server
            and client-side protocols. It is bootstrapped with Google Map,
            Socket.io, Tailwind CSS and other third-party APIs. Some familiar
            technology stack include Javascript, Chakra-UI, Reactjs and Native.
            At the moment, this application does not support the use of other
            programming languages or frameworks.
          </Text>
          <Text mt={"2"}>
            For more information,{" "}
            <a onClick={() => mailTo()}>
              <b>contact me</b>
            </a>{" "}
            or connect to the source code on{" "}
            <a href="https://github.com/gicodes/ryder.gps">
              <b>github</b>.
            </a>
          </Text>
        </section>
      </main>
    </>
  );
};

export default inbox;
