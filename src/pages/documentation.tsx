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
        <Text mt={"10"}>
          Ryder-GP is a free{" "}
          <a href="https://nextjs.com">
            <b>NEXT</b>
          </a>{" "}
          service built to bring solutions to business logistics and security.
        </Text>
        <Text mt={"1"}>
          {" "}
          Users are connected to a real-time geo-based application, making it
          simple to send and receive location data with google map.
        </Text>
        <Text mt={"1"}>
          Registration and authentication is simple and swift to complete. Users
          have a Dashboard to manage actions and see notifications while Ryders
          can see requests and ratings. As the project scales, it will be
          subscription-based to ensure quality assurance and control.
        </Text>
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
          clients. A client could be a user who want to send goods out and need
          a fast service, or a client could be a service provider who need
          customers. Whatever the case, Ryder-GP brings an in-house solution for
          either party. By signing in and connecting, clients can see available
          ryders or search for the ones nearby. A ryder must be checked-in to
          send or recieve any service request, making it easy to be searched,
          seen or located.
        </Text>
        <Heading
          mt={"3"}
          fontSize={"x-large"}
          className="flex flex-1 justify-center px-4 py-4 lg:px-8"
        >
          Security
        </Heading>
        <Text>
          {" "}
          Users can sign up to test the application without any security
          concerns. Ryder-GP runs on serverless functions which mean that
          network connections are safe and fast, and user information is
          securely collected and stored by{" "}
          <a href="https://mongodb.com">
            <b>MongoDB Atlas</b>
          </a>
          .{" "}
        </Text>
        <Heading
          mt={"3"}
          fontSize={"x-large"}
          className="flex flex-1 justify-center px-4 py-4 lg:px-8"
        >
          Developer
        </Heading>
        <Text mt={"2"}>
          This project is open-source and constantly in development. It is
          currently open to contribution, partnerships or sponsorship.
        </Text>
        <Heading fontSize={"medium"} mt={"3"}>
          How can a developer contribute?
        </Heading>
        <Text mt={"1"}>
          Developers can contribute to this project by writing clean and
          scalable codes, data structure- algorithims that support the
          application, design themes and flow patterns that are likened to
          client demand, design new products and logic that can help to scale
          the application and generate revenue.
        </Text>
        <Text mt={"2"}>
          {" "}
          Ryder-GP is primarily built on Nextjs using Typescript for server and
          client-side protocols. It is bootstrapped with Google Map, Socket.io,
          Tailwind CSS and other third-party APIs. Some familiar technology
          stack include Javascript, Chakra-UI, Reactjs and Native. At the
          moment, this application does not support the use of other programming
          languages or frameworks.
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
      </main>
    </>
  );
};

export default inbox;
