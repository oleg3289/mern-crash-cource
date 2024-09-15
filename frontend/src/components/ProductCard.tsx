import {
    Box, Button,
    Heading,
    HStack,
    IconButton,
    Image, Input,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue, useDisclosure,
    useToast, VStack
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {Product} from "../models/product.models.tsx";
import {useProductStore} from "../store/product.ts";
import {useState} from "react";

const ProductCard = ({ product }: {product: Product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
    const handleDeleteProduct = async (id: string) => {
        const {success, message} = await deleteProduct(id);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
        }
    }

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = useState<Product>(product);
    const handleUpdatedProduct = async () => {
        const {success, message} = await updateProduct(updatedProduct);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
            onClose();
        }
    }

    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{transform: "translateY(-5px)", shadow: "xl"}}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} aria-label={"lol"} onClick={onOpen} colorScheme={"blue"} />
                    <IconButton icon={<DeleteIcon />} aria-label={"lol"} onClick={() => handleDeleteProduct(product._id!)} colorScheme={"red"} />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value as unknown as number })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleUpdatedProduct}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
};
export default ProductCard;