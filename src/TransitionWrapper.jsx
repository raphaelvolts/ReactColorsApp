import { useLocation, useOutlet } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./styles/Page.css";

export default function Page({ routes }) {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } = routes.find(
    (route) =>
      route.path === location.pathname ||
      route.path.split("/").length === location.pathname.split("/").length
  );

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        {(state) => (
          <div ref={nodeRef} className="page">
            {currentOutlet}
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
}
