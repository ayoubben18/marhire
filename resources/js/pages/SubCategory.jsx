import UnifiedSubcategory from "../components/site/UnifiedSubcategory";

const SubCategory = ({ category, subcategory, city }) => {
    return (
        <UnifiedSubcategory
            categorySlug={category}
            subcategorySlug={subcategory}
            city={city}
        />
    );
};

export default SubCategory;
