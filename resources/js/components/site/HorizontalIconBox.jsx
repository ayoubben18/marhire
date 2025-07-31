const HorizontalIconBox = ({title, items}) => {

    return (
        <section className="horizontalicon-section">
            <div className="container">
                <h2>
                    {title}
                </h2>
                <ul className="horizontalicon-list">
                    {items.map((item, index) => (
                        <li key={index}><span className="horizontalicon__icon">{item.icon && item.icon}</span>{item.title}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default HorizontalIconBox;
