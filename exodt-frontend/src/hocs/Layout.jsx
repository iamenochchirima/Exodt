import Header from '../components/layout/Header';

const Layout = ({children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};
export default Layout;