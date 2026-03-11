import java.util.*;

// Doctor class
class Doctor {

    String name;
    String specialization;
    String hospital;
    String place;
    double rating;
    int slots;

    Doctor(String name,String specialization,String hospital,String place,double rating,int slots){
        this.name=name;
        this.specialization=specialization;
        this.hospital=hospital;
        this.place=place;
        this.rating=rating;
        this.slots=slots;
    }

    void display(){

        System.out.println("\n-----------------------------");
        System.out.println("Doctor Name: "+name);
        System.out.println("Specialization: "+specialization);
        System.out.println("Hospital: "+hospital);
        System.out.println("Location: "+place);
        System.out.println("Rating: "+rating);
        System.out.println("Available Slots: "+slots);
        System.out.println("-----------------------------");
    }
}


// Appointment class
class Appointment{

    String patientName;
    String phone;
    String date;
    String doctorName;

    Appointment(String patientName,String phone,String date,String doctorName){

        this.patientName=patientName;
        this.phone=phone;
        this.date=date;
        this.doctorName=doctorName;
    }

    void display(){

        System.out.println("\nAppointment Details");
        System.out.println("Patient Name : "+patientName);
        System.out.println("Phone Number : "+phone);
        System.out.println("Doctor       : "+doctorName);
        System.out.println("Date         : "+date);
    }
}


public class HealthCareDSA {

    static Queue<Appointment> appointmentQueue = new LinkedList<>();
    static Stack<String> feedbackStack = new Stack<>();


    // Linear Search
    static void searchDoctor(Doctor doctors[],String spec,String place){

        boolean found=false;

        for(int i=0;i<doctors.length;i++){

            if(doctors[i].specialization.equalsIgnoreCase(spec) &&
               doctors[i].place.equalsIgnoreCase(place)){

                doctors[i].display();
                found=true;
            }
        }

        if(!found)
        System.out.println("No Doctor Available");
    }



    // Bubble Sort
    static void sortDoctors(Doctor doctors[]){

        for(int i=0;i<doctors.length-1;i++){

            for(int j=0;j<doctors.length-i-1;j++){

                if(doctors[j].rating < doctors[j+1].rating){

                    Doctor temp=doctors[j];
                    doctors[j]=doctors[j+1];
                    doctors[j+1]=temp;
                }
            }
        }

        System.out.println("\nDoctors Sorted by Rating\n");

        for(Doctor d:doctors)
        d.display();
    }



    // Book Appointment
    static void bookAppointment(Scanner sc){

        System.out.print("Enter Doctor Name: ");
        String doctor=sc.nextLine();

        System.out.print("Enter Patient Name: ");
        String name=sc.nextLine();

        System.out.print("Enter Phone Number: ");
        String phone=sc.nextLine();

        System.out.print("Enter Appointment Date (DD-MM-YYYY): ");
        String date=sc.nextLine();

        Appointment ap=new Appointment(name,phone,date,doctor);

        appointmentQueue.add(ap);

        System.out.println("\nAppointment Booked Successfully");
    }



    // View Appointments
    static void viewAppointments(){

        if(appointmentQueue.isEmpty()){

            System.out.println("No Appointments Booked");
            return;
        }

        System.out.println("\nAppointment Queue\n");

        for(Appointment a:appointmentQueue)
        a.display();
    }



    // Feedback
    static void giveFeedback(Scanner sc){

        System.out.print("Enter Feedback: ");
        String fb=sc.nextLine();

        feedbackStack.push(fb);

        System.out.println("Feedback Submitted");
    }



    static void viewFeedback(){

        if(feedbackStack.isEmpty()){

            System.out.println("No Feedback Available");
            return;
        }

        System.out.println("\nFeedback History\n");

        for(String fb:feedbackStack)
        System.out.println(fb);
    }



    public static void main(String[] args){

        Scanner sc=new Scanner(System.in);

        Doctor doctors[]={

            new Doctor("DR. Ramesh Kumar","Cardiologist","Apollo","Hyderabad",4.8,10),
            new Doctor("DR. Suresh Reddy","Cardiologist","Yashoda","Secunderabad",4.3,10),
            new Doctor("DR. Anitha Rao","Cardiologist","Medicover","Hyderabad",4.2,10),
            new Doctor("DR. Santhosh","Cardiologist","KIMS","Hyderabad",4.2,10),
            new Doctor("DR. Anitha Rao","Cardiologist","NIMS","Hyderabad",4.1,10),

            new Doctor("DR. Hima Sekhar","Dermatologist","Apollo","Secunderabad",4.7,10),
            new Doctor("DR. Sri charan","Dermatologist","KIMS","Hyderabad",4.4,10),
            new Doctor("DR. Jayaram","Dermatologist","Yashoda","Hi-Tech City",4.2,10),
            new Doctor("DR. Jaidev","Dermatologist","NIMS","Hyderabad",4.2,10),
            new Doctor("DR. Chandra","Dermatologist","Sunshine","Hyderabad",4.1,10),

            new Doctor("DR. Gopal Reddy","Gastroenterologist","AIG","Hyderabad",4.9,10),
            new Doctor("DR. Mahesh Kumar","Gastroenterologist","PACE","Hyderabad",4.4,10),
            new Doctor("DR. Kumar","Gastroenterologist","Sunshine","Hyderabad",4.2,10),
            new Doctor("DR. Pavan","Gastroenterologist","KIMS","Kondapur",4.1,10),
            new Doctor("DR. Mohan","Gastroenterologist","NIMS","Hyderabad",4.2,10),

            new Doctor("DR. Naresh","Neurologist","Apollo","Hyderabad",4.5,10),
            new Doctor("DR. Prakash","Neurologist","Yashoda","Hyderabad",4.3,10),
            new Doctor("DR. Chandu","Neurologist","Sunshine","Hyderabad",4.3,10),
            new Doctor("DR. Varshit","Neurologist","AIG","Hyderabad",4.2,10),
            new Doctor("DR. Karith","Neurologist","NIMS","Hyderabad",4.1,10),
        };


        while(true){

            System.out.println("\n===== Digital Health Care Searching System =====\n");

            System.out.println("1. Search Doctor");
            System.out.println("2. Sort Doctors by Rating");
            System.out.println("3. Book Appointment");
            System.out.println("4. View Appointment ");
            System.out.println("5. Give Feedback");
            System.out.println("6. View Feedback");
            System.out.println("7. Exit");

            System.out.print("\nEnter Choice: ");

            int choice=sc.nextInt();
            sc.nextLine();

            switch(choice){

                case 1:

                    System.out.print("Enter Specialization: ");
                    String spec=sc.nextLine();

                    System.out.print("Enter Place: ");
                    String place=sc.nextLine();

                    searchDoctor(doctors,spec,place);
                    break;


                case 2:
                    sortDoctors(doctors);
                    break;


                case 3:
                    bookAppointment(sc);
                    break;


                case 4:
                    viewAppointments();
                    break;


                case 5:
                    giveFeedback(sc);
                    break;


                case 6:
                    viewFeedback();
                    break;


                case 7:
                    System.out.println("Thank You");
                    System.exit(0);


                default:
                    System.out.println("Invalid Choice");
            }
        }
    }
}