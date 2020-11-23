import React, { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const Content: FC<Props> = ({ children }) => {
  return (
    <section className="container">
      <div className="warp">
        {children}
      </div>
    </section>
  );
};

export default Content;
