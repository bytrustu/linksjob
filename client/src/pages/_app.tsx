import React  from 'react';
import { AppProps } from 'next/app';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import AppLayout from '../components/Layout/AppLayout';
import '../asset/scss/reset.scss';
import '../asset/scss/layout.scss';
import '../asset/scss/common.scss';
import '../asset/scss/media.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" className="next-head"/>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(MyApp);