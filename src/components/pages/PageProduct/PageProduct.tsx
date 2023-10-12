import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProduct } from "~/queries/products";
import { useParams } from "react-router-dom";

export default function PageProduct() {
  const { id } = useParams();
  const { data: product, isLoading } = useAvailableProduct(id);

  if (isLoading || !product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card
      sx={{ height: "100%", display: "flex", flexDirection: "column", mt: 2 }}
    >
      <CardMedia
        sx={{ pt: "56.25%" }}
        image={product.imageUrl}
        title="Image title"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography>{formatAsPrice(product.price)}</Typography>
      </CardContent>
      <CardActions>
        <AddProductToCart product={product} />
      </CardActions>
    </Card>
  );
}
