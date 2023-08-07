import { Heading, Text } from "@chakra-ui/react";

const inbox = () => {
  return (
    <>
      <Heading className="flex flex-1 justify-center px-4 py-8 lg:px-8">
        Documentation
      </Heading>
      <hr />
      <main className="container-fluid position-absolute h-100 bg-light">
        <Text mt={"10"}>
          Ryder GP is a free{" "}
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
          subscription-based to ensure quality services and control.
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
          The idea behind Ryder GP is a peer-to-peer communication between
          clients. A client could be a user who want to send goods out and need
          a fast service, or a client could be a service provider who need
          customers. Whatever the case, Ryder GP brings an in-house solution for
          either party. By signing in and connecting, clients can see available
          ryders or search for the ones nearby. A Ryder must be checked-in to
          send or recieve any service request, making it easy to be searched,
          seen or tracked.
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
          concerns. It's serverless functions mean that connections are safe,
          fast and user information is securely stored and protected on{" "}
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
          This project is still being developed, and so is open to sponsorship
          and contributions. As a developer, you can contribute to this project
          as an open-source by writing clean and scalable codes with Typescript.
          Ryder GP uses{" "}
          <a>
            <b>Vercel's</b>
          </a>
          next.js and is bootstrapped with Google Map, Socket-client and other
          third-party APIs. For more information,{" "}
          <a href="gicodes9@gmail.com">
            <b>contact me</b>
          </a>{" "}
          or see the source code on{" "}
          <a href="https://github.com/gicodes/ryder.gps">
            <b>github</b>.
          </a>
        </Text>
      </main>
    </>
  );
};

export default inbox;
