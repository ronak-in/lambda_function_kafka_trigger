# AWS Setup

# Create an EC2 instance
- Give an instance name
- Choose Ubuntu as base image.
- Provide VPC which can be made quickly from their wizard
- Create a key pair for further connection to it using Command line.
- Choose instance type as `t2.medium` as default `t2.micro` have 1Gi RAM only. Which might be less for running Kafka under it.
- For safe a side, take memory as 16Gi
- Edit it’s  inbound security to allow Custom TCP with port 9092 for all IP incoming traffic with 0.0.0.0/0


# Set up Kafka on EC2 instance
- Connect your EC2 with instant command connect within EC2
- Go on directory of opt/
- Get the kafka package from their office site, 
wget https://downloads.apache.org/kafka/3.7.0/kafka_2.12-3.7.0.tgz
- unzip the file using command, 
sudo tar -xzf kafka_2.12-3.7.0.tgz
- Rename the package to `kafka`
sudo mv kafka_2.12-3.7.0 kafka
- Go inside the kafka directory, 
opt/kafka/config/
- Edit the zookeeper.properties
sudo vim zookeeper.properties
#
dataDir=opt/kafka/zookeeper-data
#
- Edit the server.properties
sudo vim server.properties
#
log.dirs=opt/kafka /kafka-logs
advertised.listeners=PLAINTEXT://your-ec2-external-ip:9092 (Get the public IP of your EC2 instace)
#
- Go to root directory
- Start your zookeeper first, and don’t close the window
sudo /opt/kafka/bin/zookeeper-server-start.sh /opt/kafka/config/zookeeper.propertie
- Open another command instance, and Start your kafka server after zookeeper start to operate, and don’t close the window
sudo /opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties
- Open another command instance, create a topic
sudo /opt/kafka/bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic file-upload-trigger-topic


# Create S3 bucket
- Give a tenant specific bucket name
- Take all default option and create bucket.


# Create Lambda function
- Create a lambda function.
- Provide the runtime as NodeJS
- Create a trigger in lambda function
- Choose trigger type as S3 bucket
- Choose your created S3 bucket
- By default it will give event type as Object.created()
- Confirm terms and create the lambda function.
- Upload the code in zip format there and publish it.


# IAM Access Key
- Go to the IAM service
- Under the users section, choose your user
- Go to the access manager, and create a key combination
- This key will be useful in Java app to fetch S3 bucket file.
