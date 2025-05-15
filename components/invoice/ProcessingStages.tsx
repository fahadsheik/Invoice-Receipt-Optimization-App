import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Check, Circle, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function ProcessingStages({ stages, currentStage }) {
  return (
    <View style={styles.container}>
      {stages.map((stage, index) => {
        // Calculate the status of this stage
        const isComplete = index < currentStage;
        const isActive = index === currentStage;
        const isPending = index > currentStage;

        // Determine icon to display
        const getIcon = () => {
          if (isComplete) {
            return <Check size={20} color="#34C759" />;
          } else if (isActive) {
            return <Clock size={20} color="#007AFF" />;
          } else {
            return <Circle size={20} color="#C7C7CC" />;
          }
        };

        return (
          <View key={stage.name} style={styles.stageContainer}>
            <View style={styles.stageRow}>
              {/* Stage Icon */}
              <View style={[
                styles.stageIcon,
                isComplete && styles.stageIconComplete,
                isActive && styles.stageIconActive,
                isPending && styles.stageIconPending,
              ]}>
                {getIcon()}
              </View>
              
              {/* Stage Line (except for last item) */}
              {index < stages.length - 1 && (
                <View style={styles.stageLineContainer}>
                  <View style={[
                    styles.stageLine,
                    isComplete && styles.stageLineComplete,
                  ]} />
                </View>
              )}
            </View>
            
            {/* Stage Details */}
            <View style={styles.stageDetails}>
              <Text style={[
                styles.stageName,
                isActive && styles.stageNameActive,
                isComplete && styles.stageNameComplete,
              ]}>
                {stage.name}
              </Text>
              
              <Text style={styles.stageStatus}>
                {isComplete ? 'Complete' : isActive ? 'In Progress' : 'Pending'}
              </Text>
              
              {isActive && (
                <View style={styles.activeIndicator}>
                  <ProcessingIndicator />
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

// Animated processing indicator
function ProcessingIndicator() {
  const [animation] = React.useState(new Animated.Value(0));
  
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  const opacity = animation;
  
  return (
    <Animated.View
      style={[
        styles.processingDot,
        { opacity }
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  stageContainer: {
    marginBottom: 32,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  stageIconComplete: {
    backgroundColor: '#E6F9ED',
    borderColor: '#34C759',
  },
  stageIconActive: {
    backgroundColor: '#E6F0FF',
    borderColor: '#007AFF',
  },
  stageIconPending: {
    backgroundColor: '#F2F2F7',
    borderColor: '#E5E5EA',
  },
  stageLineContainer: {
    flex: 1,
    height: 24,
    paddingHorizontal: 8,
  },
  stageLine: {
    height: 2,
    backgroundColor: '#E5E5EA',
  },
  stageLineComplete: {
    backgroundColor: '#34C759',
  },
  stageDetails: {
    marginLeft: 46,
    marginTop: 4,
  },
  stageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  stageNameActive: {
    color: '#007AFF',
  },
  stageNameComplete: {
    color: '#34C759',
  },
  stageStatus: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  processingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginRight: 4,
  },
});