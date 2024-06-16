import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { alertService, alertType } from "./services";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Subscription } from "rxjs";
import PropTypes from "prop-types";

// Defining AlertType
interface AlertTypes {
  id: number;
  message: string;
  keepAfterRouteChange: boolean;
  autoClose: boolean;
  itemId?: number;
  fade: any;
  type: any;
}

export { GlobalAlert };

GlobalAlert.propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

GlobalAlert.defaultProps = {
  id: "default-alert",
  fade: true,
};

function GlobalAlert({ id, fade }: any) {
  const mounted = useRef(false);
  const router = useRouter();
  const [alerts, setAlerts] = useState<AlertTypes[]>([]);

  useEffect(() => {
    mounted.current = true;

    // subscribe to new alert notifications
    const subscription: Subscription = alertService
      .onAlert(id)
      .subscribe((alert: AlertTypes) => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          setAlerts((alerts: AlertTypes[]) => {
            // filter out alerts without 'keepAfterRouteChange' flag
            const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

            // remove 'keepAfterRouteChange' flag on the rest
            return omit(filteredAlerts);
          });
        } else {
          // add alert to array with unique id
          alert.itemId = Math.random();
          setAlerts((alerts) => [...alerts, alert]);

          // auto close alert if required
          if (alert.autoClose) {
            setTimeout(() => removeAlert(alert), 3000);
          }
        }
      });

    // clear alerts on location change
    const clearAlerts = () => alertService.clear(id);
    router.events.on("routeChangeStart", clearAlerts);

    // clean up function that runs when the component unmounts
    return () => {
      mounted.current = false;

      // unsubscribe to avoid memory leaks
      subscription.unsubscribe();
      router.events.off("routeChangeStart", clearAlerts);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function omit({ arr, key }: any) {
    return arr?.map((obj: any) => {
      const { [key]: omitted, ...rest } = obj;
      return rest;
    });
  }

  function removeAlert(alert: any) {
    if (!mounted.current) return;

    if (fade) {
      // fade out alert
      setAlerts(
        alerts.map((x) =>
          x.itemId === alert.itemId ? { ...x, fade: true } : x
        )
      );

      // remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
      }, 250);
    } else {
      // remove alert
      setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
    }
  }

  function getAlertStatus(
    alert: AlertTypes
  ): "error" | "info" | "warning" | "success" | undefined | any {
    const alertTypeStatus = {
      [alertType.Success]: "success",
      [alertType.Warning]: "warning",
      [alertType.Info]: "info",
    };

    return alertTypeStatus[alert.type];
  }

  if (!alerts?.length) return null;

  return (
    <div>
      {alerts.map((alert, index) => (
        <Alert mb={"2"} key={index} status={getAlertStatus(alert)}>
          <AlertIcon />
          <AlertDescription
            m={"2"}
            dangerouslySetInnerHTML={{ __html: alert.message }}
          ></AlertDescription>
          <a className="close" onClick={() => removeAlert(alert)}>
            <CloseButton
              className="alertCloseBtn"
              position="absolute"
              size={"sm"}
              right={2}
              top={1}
            />
          </a>
        </Alert>
      ))}
    </div>
  );
}
