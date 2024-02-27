export const getServerSideProps = async () => {
    const initialDate = new Date().toISOString(); 
    return initialDate;
};