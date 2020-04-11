import  React  from "react";
import  ReactDOM  from "react-dom";

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComonent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info, please don't share</p>}
            <WrappedComonent {...props}/>
        </div>
    );
}

const requireAuthentication = (WrappedComonent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComonent {...props} /> : <p>You are not authenticated to watch the content</p>} 
        </div>
    );
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are teh details" />, document.getElementById('app'));