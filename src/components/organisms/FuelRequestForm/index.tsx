import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider, useFormContext, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Fuel, Truck, Calendar, CreditCard, CheckCircle, 
  ChevronRight, ChevronLeft, User, MapPin, Phone, 
  Mail, Clock, AlertTriangle, X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/molecules/Card';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Typography } from '@/components/atoms/Typography';
import { FormField } from '@/components/molecules/FormField';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

// Form schema
const schema = yup.object({
  // Step 1: Personal Information
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  
  // Step 2: Delivery Details
  address: yup.string().required('Delivery address is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.string().required('Postal code is required'),
  deliveryDate: yup.date().required('Delivery date is required').min(
    new Date(new Date().setDate(new Date().getDate() + 1)),
    'Delivery date must be at least tomorrow'
  ),
  deliveryTime: yup.string().required('Delivery time is required'),
  
  // Step 3: Fuel Details
  fuelType: yup.string().required('Fuel type is required'),
  quantity: yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .min(50, 'Minimum order is 50 liters')
    .max(10000, 'Maximum order is 10,000 liters'),
  
  // Step 4: Payment Information
  paymentMethod: yup.string().required('Payment method is required'),
  cardNumber: yup.string().when('paymentMethod', {
    is: 'credit_card',
    then: () => yup.string()
      .required('Card number is required')
      .matches(/^\d{16}$/, 'Card number must be 16 digits'),
    otherwise: () => yup.string()
  }),
  cardExpiry: yup.string().when('paymentMethod', {
    is: 'credit_card',
    then: () => yup.string()
      .required('Expiry date is required')
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
    otherwise: () => yup.string()
  }),
  cardCVC: yup.string().when('paymentMethod', {
    is: 'credit_card',
    then: () => yup.string()
      .required('CVC is required')
      .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
    otherwise: () => yup.string()
  }),
  
  // Terms and conditions
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

type FormData = yup.InferType<typeof schema>;

// Fuel types
const FUEL_TYPES = [
  { id: 'petrol', name: 'Petrol', price: 1.45 },
  { id: 'diesel', name: 'Diesel', price: 1.50 },
  { id: 'lpg', name: 'LPG', price: 0.85 },
  { id: 'kerosene', name: 'Kerosene', price: 1.20 },
  { id: 'red_diesel', name: 'Red Diesel', price: 1.30 },
];

// Delivery time slots
const TIME_SLOTS = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
];

// Payment methods
const PAYMENT_METHODS = [
  { id: 'credit_card', name: 'Credit Card' },
  { id: 'bank_transfer', name: 'Bank Transfer' },
  { id: 'invoice', name: 'Invoice (Business Customers)' },
];

// Step components
const Step1 = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  
  return (
    <div className="space-y-4">
      <FormField
        label="Full Name"
        htmlFor="fullName"
        error={errors.fullName?.message}
        required
      >
        <Input
          id="fullName"
          {...register('fullName')}
          leftIcon={<User size={16} />}
          error={!!errors.fullName}
        />
      </FormField>
      
      <FormField
        label="Email Address"
        htmlFor="email"
        error={errors.email?.message}
        required
      >
        <Input
          id="email"
          type="email"
          {...register('email')}
          leftIcon={<Mail size={16} />}
          error={!!errors.email}
        />
      </FormField>
      
      <FormField
        label="Phone Number"
        htmlFor="phone"
        error={errors.phone?.message}
        required
      >
        <Input
          id="phone"
          {...register('phone')}
          leftIcon={<Phone size={16} />}
          error={!!errors.phone}
        />
      </FormField>
    </div>
  );
};

const Step2 = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormData>();
  const deliveryDate = watch('deliveryDate');
  
  return (
    <div className="space-y-4">
      <FormField
        label="Delivery Address"
        htmlFor="address"
        error={errors.address?.message}
        required
      >
        <Input
          id="address"
          {...register('address')}
          leftIcon={<MapPin size={16} />}
          error={!!errors.address}
        />
      </FormField>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="City"
          htmlFor="city"
          error={errors.city?.message}
          required
        >
          <Input
            id="city"
            {...register('city')}
            error={!!errors.city}
          />
        </FormField>
        
        <FormField
          label="Postal Code"
          htmlFor="postalCode"
          error={errors.postalCode?.message}
          required
        >
          <Input
            id="postalCode"
            {...register('postalCode')}
            error={!!errors.postalCode}
          />
        </FormField>
      </div>
      
      <FormField
        label="Delivery Date"
        htmlFor="deliveryDate"
        error={errors.deliveryDate?.message}
        required
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              leftIcon={<Calendar size={16} />}
            >
              {deliveryDate ? format(deliveryDate, 'PPP') : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={deliveryDate}
              onSelect={(date) => setValue('deliveryDate', date)}
              disabled={(date) => date < new Date() || date < new Date(new Date().setDate(new Date().getDate() + 1))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormField>
      
      <FormField
        label="Delivery Time"
        htmlFor="deliveryTime"
        error={errors.deliveryTime?.message}
        required
      >
        <Select
          onValueChange={(value) => setValue('deliveryTime', value)}
          defaultValue={watch('deliveryTime')}
        >
          <SelectTrigger id="deliveryTime" className={errors.deliveryTime ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select time slot" />
          </SelectTrigger>
          <SelectContent>
            {TIME_SLOTS.map((slot) => (
              <SelectItem key={slot} value={slot}>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {slot}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
    </div>
  );
};

const Step3 = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormData>();
  const fuelType = watch('fuelType');
  const quantity = watch('quantity');
  
  // Calculate total cost
  const selectedFuel = FUEL_TYPES.find(fuel => fuel.id === fuelType);
  const totalCost = selectedFuel && quantity ? selectedFuel.price * quantity : 0;
  
  return (
    <div className="space-y-4">
      <FormField
        label="Fuel Type"
        htmlFor="fuelType"
        error={errors.fuelType?.message}
        required
      >
        <Select
          onValueChange={(value) => setValue('fuelType', value)}
          defaultValue={fuelType}
        >
          <SelectTrigger id="fuelType" className={errors.fuelType ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            {FUEL_TYPES.map((fuel) => (
              <SelectItem key={fuel.id} value={fuel.id}>
                <div className="flex items-center">
                  <Fuel size={16} className="mr-2" />
                  {fuel.name} (£{fuel.price.toFixed(2)}/L)
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
      
      <FormField
        label="Quantity (Liters)"
        htmlFor="quantity"
        error={errors.quantity?.message}
        hint="Minimum order: 50 liters"
        required
      >
        <Input
          id="quantity"
          type="number"
          min="50"
          max="10000"
          {...register('quantity', { valueAsNumber: true })}
          error={!!errors.quantity}
        />
      </FormField>
      
      {fuelType && quantity && quantity > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md mt-4"
        >
          <div className="flex justify-between items-center">
            <Typography variant="muted">Unit Price:</Typography>
            <Typography variant="large">£{selectedFuel?.price.toFixed(2)}/L</Typography>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="muted">Quantity:</Typography>
            <Typography variant="large">{quantity.toLocaleString()} L</Typography>
          </div>
          <div className="border-t border-green-200 dark:border-green-800 my-2"></div>
          <div className="flex justify-between items-center">
            <Typography variant="h5">Total Cost:</Typography>
            <Typography variant="h4" className="text-green-700 dark:text-green-400">£{totalCost.toFixed(2)}</Typography>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Step4 = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormData>();
  const paymentMethod = watch('paymentMethod');
  const termsAccepted = watch('termsAccepted');
  
  return (
    <div className="space-y-4">
      <FormField
        label="Payment Method"
        htmlFor="paymentMethod"
        error={errors.paymentMethod?.message}
        required
      >
        <Select
          onValueChange={(value) => setValue('paymentMethod', value)}
          defaultValue={paymentMethod}
        >
          <SelectTrigger id="paymentMethod" className={errors.paymentMethod ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_METHODS.map((method) => (
              <SelectItem key={method.id} value={method.id}>
                <div className="flex items-center">
                  <CreditCard size={16} className="mr-2" />
                  {method.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
      
      {paymentMethod === 'credit_card' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          <FormField
            label="Card Number"
            htmlFor="cardNumber"
            error={errors.cardNumber?.message}
            required
          >
            <Input
              id="cardNumber"
              {...register('cardNumber')}
              placeholder="1234 5678 9012 3456"
              maxLength={16}
              error={!!errors.cardNumber}
            />
          </FormField>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Expiry Date"
              htmlFor="cardExpiry"
              error={errors.cardExpiry?.message}
              required
            >
              <Input
                id="cardExpiry"
                {...register('cardExpiry')}
                placeholder="MM/YY"
                maxLength={5}
                error={!!errors.cardExpiry}
              />
            </FormField>
            
            <FormField
              label="CVC"
              htmlFor="cardCVC"
              error={errors.cardCVC?.message}
              required
            >
              <Input
                id="cardCVC"
                {...register('cardCVC')}
                placeholder="123"
                maxLength={4}
                error={!!errors.cardCVC}
              />
            </FormField>
          </div>
        </motion.div>
      )}
      
      {paymentMethod === 'bank_transfer' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md"
        >
          <Typography variant="h5" className="text-blue-700 dark:text-blue-400 mb-2">Bank Transfer Details</Typography>
          <Typography variant="small">
            Please use the following details to make your payment:
          </Typography>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between">
              <Typography variant="small" className="font-medium">Account Name:</Typography>
              <Typography variant="small">FuelFriendly Ltd</Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="small" className="font-medium">Account Number:</Typography>
              <Typography variant="small">12345678</Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="small" className="font-medium">Sort Code:</Typography>
              <Typography variant="small">12-34-56</Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="small" className="font-medium">Reference:</Typography>
              <Typography variant="small">Your order number will be provided</Typography>
            </div>
          </div>
        </motion.div>
      )}
      
      {paymentMethod === 'invoice' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md"
        >
          <div className="flex items-start">
            <AlertTriangle size={20} className="text-amber-600 mr-2 mt-0.5" />
            <div>
              <Typography variant="h5" className="text-amber-700 dark:text-amber-400 mb-1">Invoice Payment</Typography>
              <Typography variant="small">
                This option is only available for business customers with an approved account.
                Our team will contact you to verify your business details before processing your order.
              </Typography>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="mt-6">
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            {...register('termsAccepted')}
            className="mt-1"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            I agree to the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-xs text-destructive mt-1">{errors.termsAccepted.message}</p>
        )}
      </div>
    </div>
  );
};

interface FuelRequestFormProps {
  className?: string;
}

const FuelRequestForm: React.FC<FuelRequestFormProps> = ({ className }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Initialize form with default values and validation schema
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      deliveryDate: undefined,
      deliveryTime: '',
      fuelType: '',
      quantity: 100,
      paymentMethod: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
      termsAccepted: false
    },
    mode: 'onChange'
  });
  
  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('fuelRequestForm');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        
        // Convert date string back to Date object
        if (parsedData.deliveryDate) {
          parsedData.deliveryDate = new Date(parsedData.deliveryDate);
        }
        
        methods.reset(parsedData);
        
        toast({
          title: "Form Data Restored",
          description: "Your previous form data has been loaded.",
          duration: 3000,
        });
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, [methods, toast]);
  
  // Save form data to localStorage when it changes
  const saveFormData = () => {
    const formData = methods.getValues();
    localStorage.setItem('fuelRequestForm', JSON.stringify(formData));
  };
  
  // Handle next step
  const handleNext = async () => {
    const fieldsToValidate: Record<number, (keyof FormData)[]> = {
      1: ['fullName', 'email', 'phone'],
      2: ['address', 'city', 'postalCode', 'deliveryDate', 'deliveryTime'],
      3: ['fuelType', 'quantity'],
      4: ['paymentMethod', 'termsAccepted']
    };
    
    // Validate current step fields
    const result = await methods.trigger(fieldsToValidate[currentStep]);
    
    if (result) {
      saveFormData();
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    saveFormData();
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to submit the order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random order number
      const generatedOrderNumber = 'FRQ-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrderNumber);
      
      // Clear form data from localStorage
      localStorage.removeItem('fuelRequestForm');
      
      // Show success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset form and close dialog
  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    methods.reset();
    setCurrentStep(1);
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return null;
    }
  };
  
  return (
    <FormProvider {...methods}>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="mr-2 h-6 w-6 text-green-500" />
            Pump side service Request
          </CardTitle>
          <CardDescription>
            Complete the form below to request pump side service
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`flex flex-col items-center ${
                    step <= currentStep ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                      step < currentStep 
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                        : step === currentStep 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle size={16} />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <span className="text-xs hidden sm:block">
                    {step === 1 ? 'Personal' : 
                     step === 2 ? 'Delivery' : 
                     step === 3 ? 'Fuel' : 'Payment'}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-green-500"
                initial={{ width: `${(currentStep - 1) * 25}%` }}
                animate={{ width: `${currentStep * 25}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          {/* Step title */}
          <div className="mb-6">
            <Typography variant="h4" className="text-center">
              {currentStep === 1 ? 'Personal Information' : 
               currentStep === 2 ? 'Delivery Details' : 
               currentStep === 3 ? 'Fuel Details' : 'Payment Information'}
            </Typography>
          </div>
          
          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {renderStepContent()}
              </form>
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            leftIcon={<ChevronLeft size={16} />}
          >
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              rightIcon={<ChevronRight size={16} />}
              variant="green"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              variant="green"
            >
              Submit Request
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle className="mr-2" />
              Request Submitted Successfully
            </DialogTitle>
            <DialogDescription>
              Your pump side service request has been received and is being processed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md my-4">
            <Typography variant="h5" className="text-green-700 dark:text-green-400 mb-2">
              Order Number: {orderNumber}
            </Typography>
            <Typography variant="small">
              Please keep this order number for your reference. You will receive a confirmation email shortly with the details of your order.
            </Typography>
          </div>
          
          <DialogFooter>
            <Button onClick={handleCloseDialog} variant="green">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default FuelRequestForm;
