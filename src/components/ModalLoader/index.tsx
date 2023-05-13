import { Loader, Placeholder } from 'rsuite';

const ModalLoader = () => {
    return (
        <div>
            <Placeholder.Paragraph rows={8}/>
            <Loader center size="lg" content="loading..." vertical/>
        </div>
    );
};

export default ModalLoader;
