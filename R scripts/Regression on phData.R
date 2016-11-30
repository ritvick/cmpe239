# reading the data
library(RMongo)
mg1 <- mongoDbConnect('db')
print(dbShowCollections(mg1))
query <- dbGetQuery(mg1, 'pickdata', "{'pH': {'$gte': 0}, 'date_time': {'$gte': 0}}")
utilities <- query[c('pH', 'date_time')]
summary(utilities)

#utilities <- read.csv("C:/Users/Jay/Desktop/pHdata.csv")
# plot the graph
plot(pH ~ date_time, utilities)

# trimming required data
z <- utilities[]
a<- utilities[,-c(1,1)]
b<- print(a,digits = 0)

#finding distance of each point from one another
distance <- suppressWarnings(dist(z))

#polynomial regression
i <- 500
j <- 0.5
k <- (z^2)
y <- i + j * k

m <- apply(z,2,mean)
s <- apply(z,2,sd)

noise <- rmorm(length(z), m, s)
noisy.y <- y + noise

plot(z,noisy.y,col='deepskyblue4',xlab='z',main='Observed data')
lines(z,y,col='firebrick1',lwd=3)

model <- lm(noisy.y ~ poly(z,3))

#plotting polynomial regression graph
plot(fitted(model),residuals(model))
