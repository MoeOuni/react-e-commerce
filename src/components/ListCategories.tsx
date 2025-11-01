import { categories } from '@/dev-data'
import { Card, CardContent } from './ui/card'

export function ListCategories() {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-5'>
            {categories.map((cat) =>
                <Card className='aspect-square flex justify-center items-center cursor-pointer hover:text-primary hover:border hover:border-primary'>
                    <CardContent className='text-xl font-bold uppercase'>
                        {cat}
                    </CardContent>
                </Card>)}
        </div>
    )
}

