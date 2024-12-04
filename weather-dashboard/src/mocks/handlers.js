import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:3000/api/articles', (req, res, ctx) => {
        const query = req.url.searchParams.get('query');
        if (query) {
            return res(
                ctx.status(200),
                ctx.json({
                    response: {
                        docs: [
                            {
                                _id: '1234',
                                headline: { main: 'Test Article' },
                                lead_paragraph: 'This is a test article.',
                                source: 'Test Source',
                                pub_date: '2024-01-01',
                                web_url: 'http://test.com',
                            },
                        ],
                    },
                })
            );
        } else {
            return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
        }
    }),
];
