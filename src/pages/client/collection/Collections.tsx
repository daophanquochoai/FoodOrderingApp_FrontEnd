import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";

const Collections = () => {
    return (
        <>
            <ClientBreadcrumb title="Collections" items={[{ label: "Home", to: "/" }]} />
            <div className="h-[500px]"></div>
        </>
    );
};

export default Collections;