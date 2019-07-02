export const getHelmetData = (helmet, state) => {
    const defaultHelmet = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()} 
    `;

    const helmetData = state.get('global').get('prefetch');

    const helmetStr = `
        <title>${helmetData.get('metaTitle')}</title>
        <meta name="title" content="${helmetData.get('metaTitle')}" />
        <meta name="keywords" content="${helmetData.get('metaKeywords')}" />
        <meta name="description" content="${helmetData.get('metaDescription')}" />
    `;

    return helmetData.get('use') ? helmetStr : defaultHelmet;
};
