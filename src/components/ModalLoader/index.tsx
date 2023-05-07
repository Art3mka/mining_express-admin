import { Loader, Placeholder } from 'rsuite';

const ModalLoader = () => {
    return (
        <div>
            <Placeholder.Paragraph rows={8} />
            <Loader size="lg" backdrop content="loading..." vertical />
        </div>
    );
};

export default ModalLoader;
