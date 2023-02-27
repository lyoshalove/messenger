import { JSXElementConstructor, PropsWithChildren } from "react";

interface IProps {
  components: JSXElementConstructor<PropsWithChildren>[];
}

export const Compose: React.FC<PropsWithChildren<IProps>> = ({
  components,
  children,
}) => {
  return (
    <>
      {components.reduceRight(
        (acc, Component) => (
          <Component>{acc}</Component>
        ),
        children
      )}
    </>
  );
};
