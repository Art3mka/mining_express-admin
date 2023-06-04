import { Nav } from 'rsuite';
import { Dispatch, SetStateAction } from 'react';

interface ITabs {
    appearance: 'default' | 'subtle' | 'tabs' | undefined;
    active: string;
    onSelect: Dispatch<SetStateAction<string>>;
}

const Tabs = ({ active, onSelect, ...props }: ITabs) => {
    return (
        <Nav
            {...props}
            activeKey={active}
            onSelect={onSelect}
            style={{ marginBottom: 50 }}
        >
            <Nav.Item eventKey="trips">Рейсы</Nav.Item>
            <Nav.Item eventKey="setDrive">Назначить водителя</Nav.Item>
        </Nav>
    );
};

export default Tabs;
