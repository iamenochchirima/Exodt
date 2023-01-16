import Header from '../components/Header';

const Layout = ({children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};
export default Layout;