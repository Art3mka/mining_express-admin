import { Notification } from 'rsuite';
import { MessageType } from 'rsuite/esm/Notification/Notification';

interface NotificationProps {
    type?: MessageType;
    title: string;
}

const NotificationComponent = ({ type, title }: NotificationProps) => {
    return (
        <div>
            <Notification
                style={{ width: 320 }}
                type={type}
                header={type}
                closable
            >
                <p>{title}</p>
            </Notification>
        </div>
    );
};

export default NotificationComponent;
